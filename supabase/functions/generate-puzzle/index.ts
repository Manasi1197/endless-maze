
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a cryptic riddle master. Return ONE riddle, logic puzzle, or brainteaser in max 40 words, and its answer, as a single JSON object: { 'riddle': '...', 'answer': '...' }." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 140,
    };

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const aiJson = await aiRes.json();

    const msg = aiJson.choices?.[0]?.message?.content ?? "";
    let parsed: {riddle: string, answer: string} = { riddle: "", answer: "" };

    try {
      parsed = JSON.parse(msg.replace(/```json|```/g, "")); // try to parse as JSON
    } catch {
      // fallback: wrap as string
      parsed = { riddle: msg, answer: "" };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-puzzle error:", e);
    return new Response(JSON.stringify({ error: e.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

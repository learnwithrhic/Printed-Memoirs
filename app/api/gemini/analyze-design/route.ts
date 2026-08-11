import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { product, shape, occasion, description, imageBase64 } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is missing" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `
You are the Master Print & Design Specialist at Printed Memoirs, a premier custom keepsake workshop in the UAE making personalized round and square pins, magnets, and pocket mirrors.

Analyze the user's artwork / photo submission for a custom keepsake:
- Product requested: ${product || "Pin / Magnet / Mirror"}
- Shape requested: ${shape || "Round"}
- Occasion / Event: ${occasion || "Personal Keepsake"}
- User design description: ${description || "Custom photo / logo"}

Provide a helpful, friendly, and expert assessment in JSON format with the following keys:
1. "resolutionGrade": "Excellent" | "Good" | "Needs Attention"
2. "framingAdvice": Short clear tip on how to position subject/faces/logos inside the ${shape || "Round"} bleed area.
3. "colorTip": Short suggestion on contrast, brightness, or color pop for glossy foil/laminate printing.
4. "bestShapeRecommendation": "Round" or "Square" with a 1-sentence reason.
5. "summaryNote": A warm 2-sentence note from the Printed Memoirs master printer encouraging the customer.

Return ONLY valid JSON without markdown wrapping or backticks.
`;

    let contents: any[] = [promptText];

    if (imageBase64 && typeof imageBase64 === "string" && imageBase64.startsWith("data:image/")) {
      const mimeType = imageBase64.substring("data:".length, imageBase64.indexOf(";base64"));
      const base64Data = imageBase64.split(",")[1];

      contents = [
        {
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: base64Data,
          },
        },
        promptText,
      ];
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const rawText = response.text || "";
    const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const parsed = JSON.parse(cleanJson);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        resolutionGrade: "Good",
        framingAdvice: `Keep faces and important text centered within the 5mm safety boundary of the ${shape || "Round"} shape.`,
        colorTip: "High contrast photos with vivid lighting reproduce exceptionally well on glossy laminate surfaces.",
        bestShapeRecommendation: shape || "Round",
        summaryNote: "Your design concept looks wonderful for a Printed Memoirs custom keepsake! Our production team will verify final alignment before printing.",
      });
    }
  } catch (error: any) {
    console.error("Gemini Design Analyzer Error:", error);
    return NextResponse.json(
      {
        resolutionGrade: "Good",
        framingAdvice: "Ensure main subjects are centered to avoid edge clipping during hand-assembly.",
        colorTip: "Slightly boosting image brightness will make print details pop on metallic badge backings.",
        bestShapeRecommendation: "Round",
        summaryNote: "We're excited to turn your artwork into a timeless keepsake. Submit your quote and we'll send a digital proof!",
      },
      { status: 200 }
    );
  }
}

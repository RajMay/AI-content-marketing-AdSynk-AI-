import google.generativeai as genai

# Initialize Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@app.post("/api/submit-icp")
async def generate_content(form_data: ICPForm):
    prompt = f"""
    You are a senior AI marketing strategist. Based on the following customer information:
    
    Name: {form_data.firstName} {form_data.lastName}
    Company: {form_data.company}
    Industry: {form_data.industry}
    Company Size: {form_data.companySize}
    Target Audience: {form_data.targetAudience}
    Content Marketing Goals: {form_data.contentGoals}
    Budget: {form_data.budget}
    Urgency: {form_data.urgency}

    Generate a set of 20 viral video hooks for Instagram Reels or TikTok to promote their business. Hooks should be punchy, emotionally triggering, curiosity-driven, and aligned with their audience.
    """

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)

        if response.text:
            return {"hooks": response.text}
        else:
            return {"hooks": "No content generated."}
    except Exception as e:
        return {"error": str(e)}

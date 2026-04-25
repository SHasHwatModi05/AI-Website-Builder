const extractJson = async (text) => {
    if (!text) {
        return
    }
    const safeText = typeof text === "string" ? text : JSON.stringify(text || "");
    const cleaned = safeText
         .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

        const firstBrace=cleaned.indexOf('{')
        const closeBrace=cleaned.lastIndexOf('}')
        if(firstBrace===-1 || closeBrace==-1)return null
        const jsonString=cleaned.slice(firstBrace,closeBrace+1)
        return JSON.parse(jsonString)

}
export default extractJson
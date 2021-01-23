import axios from 'axios'

export const submit = async (uid: string , file: string, label: number) => {
	return await axios.put("/api/v1/instance/label", 
		{
			uid: uid,
			file: file,
			label: label
		},
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	)
}

export const retrieve = async () => {
    return await axios.get("/api/v1/instance/info")
}

export const retrieveSingle = async (uid: string, filename: string) => {
	return await axios.post("/api/v1/instance/label",
		{
			uid: uid,
			file: filename,
		},
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	)
}
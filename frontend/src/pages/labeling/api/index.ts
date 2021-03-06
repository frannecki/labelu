import axios from 'axios'

export const submit = async (uid: string, label: number) => {
	return await axios.put(`/api/v1/group/label/${uid}`, 
		{
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
    return await axios.get("/api/v1/group/info")
}

export const retrieveSingle = async (uid: string) => {
	return await axios.get(`/api/v1/group/label/${uid}`)
}

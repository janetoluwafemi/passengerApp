"use client"
import {useRouter} from "next/navigation"
import React, {useState} from "react";


const CreatePassenger = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        passengerName: '',
        email: ''
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/passenger', {
                body: JSON.stringify(formData),
                method: 'POST',
                headers: { 'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            alert(responseJson.message)
            router.push('/routes')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex justify-center items-center w-full min-h-screen flex-col gap-5 bg-gradient-to-br
         from-blue-50 to-blue-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <div className="text-2xl font-bold text-center text-gray-800 mb-7">
                    Create Account For Passenger
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">
                            Passenger Name
                        </label>
                        <input
                            type="text"
                            placeholder="Passenger Name"
                            required={true}
                            className="border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                             focus:ring-blue-500"
                            onInvalid={() => console.log("Passenger Name Is Required")}
                            value={formData.passengerName}
                            onChange={(e) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    passengerName: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            required={true}
                            className="border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                             focus:ring-blue-500"
                            onInvalid={() => console.log("Email Is Required")}
                            value={formData.email}
                            onChange={(e) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    email: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="flex justify-center text-center flex-row gap-4 mt-4">
                        <div className="w-1/2">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300
                                 transition"
                            >
                                Back
                            </button>
                        </div>

                        <div className="w-1/2">
                            <button
                                type="submit"
                                className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700
                                 transition shadow"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePassenger

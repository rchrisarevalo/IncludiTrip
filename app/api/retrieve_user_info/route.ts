import { db } from "@/firebase";
import { collection, DocumentData, getDocs, query, Query, QuerySnapshot, where } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";

const POST = async (req: NextRequest) => {

    try {
        const data = await req.json()

        const uid = data.uid

        // Set up a query to access the user's collection of information
        // from the Firestore DB based on their UID.
        const item: Query<DocumentData, DocumentData> = query(collection(db, "users"), where("uid", "==", uid))
        
        // Retrieve the snapshot to retrieve user's disability status in order to
        // personalize recommendations to provide specific accessibility services 
        // and accommodations for them.
        const snapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(item)

        // Create an array to store the data retrieved from the database.
        let userData: any[] = []

        // Store the user's info in the userData array.
        snapshot.forEach((doc) => {
            userData.push({
                name: doc.id,
                ...doc.data()
            })
        })

        return NextResponse.json(userData, {"status": 200})
    } catch (error) {
        return NextResponse.json({"message": "Failed to retrieve information"}, {status: 500})
    }
}

export { POST };
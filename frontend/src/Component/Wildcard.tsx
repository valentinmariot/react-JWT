import { useParams } from "react-router"

export default function Wildcard() {

    const {wildcard} = useParams();

    console.log('wildcard :', wildcard);
    return (
        <div>
            <h2>
                {wildcard}
            </h2>
        </div>
    )
}
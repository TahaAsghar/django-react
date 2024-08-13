import Form from "../components/form.jsx";
function Login(){
    return <Form
    route="/api/token/"
    method="login"
    />
}

export default Login
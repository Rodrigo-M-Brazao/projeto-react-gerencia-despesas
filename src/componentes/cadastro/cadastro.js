import { useState } from "react";


const Cadastro = () => {
    const [formData, setFormData] = useState({name: '', password: ''});
    const [feedBack, setFeedBack] = useState({message: '', type: ''});


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/addUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                setFeedBack({message:'Sucesso ao cadastrar', type: 'sucesso'});
            }else{
                const erro = await response.json();
                setFeedBack({message:erro.message, type: 'erro'});
            }
            setFormData({name:'', password: ''});
            
        } catch (error) {
            console.error(error)
            setFeedBack({message:'Falha ao cadastrar', type: 'erro'})
        }
        
        
    }

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                </div>
                <br/>
                <div>
                    <label>Senha: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                </div>
                <br/> 
                <button type="submit">Enviar</button>
            </form>
            {
                feedBack.message && (
                    <div className={feedBack.type}>
                        {feedBack.message}
                    </div>
                )
            }
        </div>
        
    );
}

export default Cadastro;
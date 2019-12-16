import React, { Component } from 'react'
import { getCommande } from './UserFunctions'
import axios from 'axios'

class Commande extends Component {
    constructor() {
        super()
        this.state = {
            nom: '',
            prenom: '',
            /*prix: '',
            qte: ''*/
            commandes: {
                articles:[]
            }
        }
        this.ConfirmerCommand=this.ConfirmerCommand.bind(this)
    }

    ConfirmerCommand(commande){
        axios.post('api/json/commande/confirmation',{commande: commande},
        {headers: { 'Content-Type': 'application/json' }})
             .then(res => {
                console.log(res);
                return res.data
             })
             .catch(err => {
                 console.log(err);                 
             })
       
    }

    RejeterCommand(){
        console.log("commande rejete");        
    }


    componentDidMount() {
        axios.get('api/json/commande')
        .then(res => {
            console.log(res)
            const commandes = res.data
            this.setState({ commandes:commandes })
        })
        .catch(err => {
            console.log(err)
        })
        /*getCommande().then(res => {
            this.setState({
                nom: res.cmd[0].nom,
                prenom: res.cmd[0].prenom,
                prix: res.cmd[0].prix
            })
        })*/
    }

    render() {
        const liste = Array.isArray(this.state.commandes) && this.state.commandes.map(cnd =>  console.log(cnd))
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h1 className="text-center">Commande</h1>
                    </div>
                    <div className="card text-center">
                    <div className="card-header">
                        CLIENT
                    </div>
                    <div className="card-body">
                        Nom Complet: {this.state.commandes.prenom} {this.state.commandes.nom} <br></br>
                        Email : {this.state.commandes.email}<br></br>
                        Adresse de livraivon: {this.state.commandes.adresse} <br></br>
                    </div>
                    </div>
                    <table className='table table-hover mt-5'>
                        <thead>
                            <tr>
                                <th scope="col">Articles</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.commandes.articles.map((item,key)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.nom} <small>{item.description}</small></td>
                                        <td>{item.prix_unitaire}</td>
                                        <td>{item.quantite}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan="1"></td>
                            <td>Total</td>
                            <td>{this.state.commandes.prix_total}</td>
                        </tr>
                        </tbody>
                    </table>

                <button className="btn btn-lg btn-primary btn-block" onClick={()=>this.ConfirmerCommand(this.state.commandes)}>Confirmer</button>
                <button className="btn btn-lg btn-secondary btn-block" onClick={()=>this.RejeterCommand()}>Rejeter</button>
                </div>
            </div>
        )
    }
}

export default Commande
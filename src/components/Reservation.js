import React, { Component } from 'react'
import axios from 'axios'
import { getProfile } from './UserFunctions'

class Reservation extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            prenom: '',
            Reservations: { }
        }
        this.ConfirmerResrvation=this.ConfirmerResrvation.bind(this)
    }

    ConfirmerResrvation(Reservation){
        axios.post('api/json/Reservation/confirmation',{Reservation},
        {headers: { 'Content-Type': 'application/json' }})
             .then(res => {
                console.log(res);
                return res.data
             })
             .catch(err => {
                 console.log(err);                 
             })
       
    }

    RejeterReservation(){
        console.log("Reservation rejete");        
    }

    componentWillMount() {
        getProfile().then(res => {
            this.setState({
                id: res.user.id
            })
        })
    }

    componentDidMount() {
        axios.get('api/json/reservation')
        .then(res => {
            console.log(res)
            const Reservations = res.data
            this.setState({ Reservations:Reservations })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        if ( this.state.id === this.state.Reservations.restaurant_id ) {
            return (
                <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h1 className="text-center">Reservation</h1>
                    </div>
                    <div className="card text-center">
                    <div className="card-header">
                        CLIENT 
                    </div>
                    <div className="card-body">
                        Nom Complet:  {this.state.Reservations.prenom} {this.state.Reservations.nom}<br></br>
                        Email : {this.state.Reservations.email}<br></br>
                        Numero de telephone:  {this.state.Reservations.telephone}<br></br>
                    </div>
                    </div>
                    <table className='table table-hover mt-5'>
                        <thead>
                            <tr>
                                <th scope="col">Date Reservation</th>
                                <th scope="col">Heure Reservation</th>
                                <th scope="col">Nombre de personne(s)</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.Reservations.date}</td>
                            <td>{this.state.Reservations.heure}</td>
                            <td>{this.state.Reservations.nombre_personnes}</td>
                        </tr>
                        </tbody>
                    </table>

                <button className="btn btn-lg btn-primary btn-block" onClick={()=>this.ConfirmerResrvation(this.state.Reservations)}>Confirmer</button>
                <button className="btn btn-lg btn-secondary btn-block" onClick={()=>this.RejeterReservation()}>Rejeter</button>
                </div>
            </div>
            )
        } else {
            return (
                <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h1 className="text-center">Reservation</h1>
                    </div>
                    <div className="card text-center">
                    <div className="card-header">
                        Infromation 
                    </div>
                    <div className="card-body">
                        <h1>Vous n'avez aucune réservation</h1>
                    </div>
                    </div>
                </div>
            </div>
            )
        }
        /*return (
            {r}
        )*/
    }
}

export default Reservation
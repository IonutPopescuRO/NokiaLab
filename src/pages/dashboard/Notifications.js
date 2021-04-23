import React, { Component } from "react";

import Data from '../../comp/Data.js'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default class Notifications extends Component {
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'success':
                    store.addNotification({
                        title: "Verificat",
                        message: "Mesaj de succes",
                        type: 'success',
                        container: 'top-right',
                        insert: 'bottom',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "zoomOut"],
                      
                        dismiss: {
                            duration: 3000,
                            showIcon:true,
                        }
                    })
                    break;
                case 'warning':
                    store.addNotification({
                        title: "Atentie",
                        message: "Mesaj de atentionare",
                        type: 'warning',
                        container: 'top-right',
                        insert: 'bottom',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "zoomOut"],
                      
                        dismiss: {
                            duration: 3000,
                            showIcon: true,
                        }
                    })
                    break;
                case 'danger':
                    store.addNotification({
                        title: "Eroare",
                        message: "Mesaj de atentionare",
                        type: 'danger',
                        container: 'top-right',
                        insert: 'bottom',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "zoomOut"],
                      
                        dismiss: {
                            duration: 3000,
                            showIcon:true,
                        }
                    })
                    break;
            }
        }
    }
    render() {
        const notificari = Data.map((Data) =>
            <div className="notification-item">
                {Data.content}
            </div>
        );
        
        return (
            <div className = "notifications-container">
                <h1 className="notifications-header">Notificari</h1>
                <h1 className="notification-text">{notificari}</h1>
                <div className = "butoane-container">
                 <button className = "adauga-notificare" onClick = {this.createNotification('success')}>Adauga confirmare</button>
                <button className = "adauga-notificare"  onClick={this.createNotification('warning')}>Adauga atentionare</button>
                <button className = "adauga-notificare"  onClick = {this.createNotification('danger')}>Adauga eroare</button>
               </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logo: '',
            currency: '',
            amount: '',
            title: '',
            description: '',
            address: '',
            fullName: '',
            documentType: '',
            documentNumber: '',
            logoPreview: null,
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/Clientes/PDF", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;"
                },
                body: JSON.stringify(this.state)
            });

            if (response.ok) {
                // Aquí puedes realizar alguna acción después de una respuesta exitosa.
                console.log("Recibo generado exitosamente.");
            } else {
                console.error("Error al generar el recibo.");
            }
        } catch (error) {
            console.error("Error al conectarse a la API:", error);
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

        if (name === 'amount' && parseFloat(value) < 0) {
            this.setState({ [name]: '0' });
        }
    };

    handleLogoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({ logo: reader.result, logoPreview: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    currencyOptions = [
        { value: 'S/', label: 'Sol peruano (PEN)' },
        { value: '$', label: 'Dolar estadounidense (USD)' },
        { value: '€', label: 'Euro (EUR)' },
        { value: '£', label: 'Libra esterlina (GBP)' },
        { value: '¥', label: 'Yen japonés (JPY)' },
        { value: 'C$', label: 'Dolar canadiense (CAD)' },
        { value: 'A$', label: 'Dolar australiano (AUD)' },
        { value: 'CHF', label: 'Franco suizo (CHF)' },
        { value: '¥', label: 'Yuan chino (CNY)' },
        { value: '₹', label: 'Rupia india (INR)' },
        { value: 'R$', label: 'Real brasileño (BRL)' },
        { value: 'R', label: 'Rand sudafricano (ZAR)' },
        { value: '$', label: 'Peso argentino (ARS)' },
        { value: 'Mex$', label: 'Peso mexicano (MXN)' },
        { value: 'Cop$', label: 'Peso colombiano (COP)' },
    ];

    documentOptions = [
        { value: 'DNI', label: 'DNI (Documento Nacional de Identidad)' },
        { value: 'CARNET', label: 'Carnet de Identidad' },
        { value: 'PASAPORTE', label: 'Pasaporte' },
        { value: 'RUC', label: 'RUC (Registro Único de Contribuyentes)' },
        { value: 'CE', label: 'Carnet de extranjería' },
    ];
    render() {
        return (
            <div className="container mt-5">
                <div className="card">
                    <h1 className="card-header bg-info text-white text-center">Crear Recibo</h1>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="title">Titulo del Recibo:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Logo de Marca:</label>
                                        {this.state.logoPreview ? (
                                            <img
                                                src={this.state.logoPreview}
                                                alt="Logo de Marca"
                                                className="img-fluid m-3"
                                                style={{ maxWidth: '100px' }}
                                            />
                                        ) : (
                                            <input
                                                type="file"
                                                name="logo"
                                                onChange={this.handleLogoChange}
                                                className="form-control"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tipo de Moneda:</label>
                                        <select
                                            name="currency"
                                            value={this.state.currency}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Seleccione una moneda</option>
                                            {this.currencyOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Monto a Cobrar:</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={this.state.amount}
                                            onChange={this.handleChange}
                                            step="0.01"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Descripcion del Recibo:</label>
                                <textarea
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Direccion:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Nombres Completos:</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={this.state.fullName}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tipo de Documento:</label>
                                        <select
                                            name="documentType"
                                            value={this.state.documentType}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Seleccione un tipo de documento</option>
                                            {this.documentOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Numero de Documento:</label>
                                        <input
                                            type="text"
                                            name="documentNumber"
                                            value={this.state.documentNumber}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-danger btn-block mt-3" type="submit">
                                Generar y Descargar Recibo PDF
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
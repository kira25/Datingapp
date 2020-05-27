import React, { Component, Fragment } from 'react'
import Form from '../../components/UI/Form';


class AddorEditActivitie extends Form {

    render() {
        return (
            <Fragment>
                <div>Agregar activiades o editarlas</div>
                <hr></hr>
                <form>
                    <div className="form-group">
                        {this.renderInput('Name of activitie', 'Name of Activitie')}
                        <h4>Descripcion</h4>
                        <textarea 
                        name ='Descripcion'
                        id=''
                        rows='3'
                        className="'form-control"
                        />
                    </div>
                </form>
            </Fragment>

        );
    }

}

export default AddorEditActivitie;
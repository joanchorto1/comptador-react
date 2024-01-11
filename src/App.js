import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {toast, ToastContainer} from "react-toastify";

function App() {
    // Utilizamos el estado para manejar el contador y el tiempo
    const [cont, setCont] = useState(0);
    const [time, setTime] = useState(null);

    const [timerRunning, setTimerRunning] = useState(false); // Nuevo estado para controlar si el temporizador está en funcionamiento




    const incrementar = () => {
        setCont(cont + 1);

        if (!timerRunning) {
            setTime(5);
            setTimerRunning(true);
        }
    };






    // Función para actualizar el tiempo
    const updateTime = () => {
        if (time > 0) {
            setTime(time - 1);
        } else {
            setTimerRunning(false); // Detenemos el temporizador cuando llega a cero
            mostrarToast()
        }
    };

    const mostrarToast = () => {
        toast.dark(`Time is finished. Puntuación: ${cont}`, {
            position: "top-center",
            autoClose: 1000, // Cerrar el toast después de 5 segundos
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,

        });
        setTime(null)
        setCont(0)

    };



    useEffect(() => {
        // Usamos useEffect para ejecutar la función de actualizarTiempo cada segundo
        if (timerRunning) {
            const interval = setInterval(updateTime, 1000);

            // Limpieza del intervalo al desmontar el componente o al detener el temporizador
            return () => clearInterval(interval);
        }
    }, [ timerRunning, time]);

    return (
        <div className=" bg-white">
            <header className=" p-5 bg-warning d-flex justify-content-between">
                <div>
                    <p className="bg-warning m-0">Comptador: {cont}</p>
                </div>
                <div>
                    <p className="bg-warning m-0">Time: {time !== null ? time : "Not started"}</p>
                </div>
            </header>
            <div className="text-center  pt-5  bg-light" style={{ height: "40vh" }}>
                <button onClick={incrementar} className="mt-5 btn btn-warning">
                    TOUCH ME!!!
                </button>
            </div>
            <div className="text-center">
                <ToastContainer className="w-25 bg-white text-center" />
            </div>
        </div>
    );
}

export default App;
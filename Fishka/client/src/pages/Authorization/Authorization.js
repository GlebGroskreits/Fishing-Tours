import React, {useEffect, useState} from "react";
import './Authorization.scss';
import { ButtonLink, CustomInput } from "../../utils/components";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { checkAuth, login } from "../../store/slices/authSlice";
import { registration } from '../../store/slices/authSlice'

const Authorization = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const action = await dispatch(login({email, password}));

        if (login.fulfilled.match(action)) {
            console.log('Авторизация прошла успешно');
            navigate('/main'); 
        }else{
            console.error('Не удалось авторизоваться:', action.error);
        }
    };

    const handleRegistation = async(event) => {
        event.preventDefault();
        
        const registrationData = {
            email: email,
            password: password,
            name: name,
            surname: surname,
            patronymic: patronymic,
            telephone: telephone,
            birthday: birthday
        }

        const action = await dispatch(registration({registrationData}));

        if (registration.fulfilled.match(action)) {
            console.log('Регистрация прошла успешно');
            const token = localStorage.removeItem('token');
            if (token) {
                dispatch(checkAuth())
            }
            // navigate('/login'); 
        }else{
            console.error('Не удалось зарегистрироваться:', action.error);
        }
    }

    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [telephone, setTelephone] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleValueChange = (newValue, type) => {
        type === 'Email' ? setEmail(newValue) :
        type === 'Password' ? setPassword(newValue) :
        type === 'Name' ? setName(newValue) : 
        type === 'Surname' ? setSurname(newValue) : 
        type === 'Patronymic' ? setPatronymic(newValue) : 
        type === 'Telephone' ? setTelephone(newValue) : setBirthday(newValue);
    };
    return (
        <>
            {isLogin ? (
                <section className="main_ar">
                    <p className="text_mnt_f26_l26">Authorization</p>
                    <div className="mar_box">
                        <CustomInput onValueChange={handleValueChange} placeholder={"Email"}/>
                        <CustomInput onValueChange={handleValueChange} placeholder={"Password"}  type={"password"}/>
                        <div className="mar_check">
                            <p className="text_mln_f18_l18">Don't have?</p>
                            <p className="text_mln_f18_l18" onClick={() => setIsLogin(false)}>Registration</p>
                        </div>
                        <button className="mar_action"  onClick={handleLogin}>
                        <p className="text_mln_f18_l18">Athorization</p>
                        </button>
                    </div>
                    
                </section>
            ) : (
                <section className="main_ar">
                <p className="text_mnt_f26_l26">Registration</p>
                <div className="mar_box">
                    <CustomInput onValueChange={handleValueChange} placeholder={"Email"}/>
                    <CustomInput onValueChange={handleValueChange} placeholder={"Password"} type={"password"}/>
                    <CustomInput onValueChange={handleValueChange} placeholder={"Name"}/>
                    <CustomInput onValueChange={handleValueChange} placeholder={"Surname"}/>
                    <CustomInput onValueChange={handleValueChange} placeholder={"Patronymic"}/>
                    <CustomInput onValueChange={handleValueChange} placeholder={"Telephone"}/>
                    <CustomInput onValueChange={handleValueChange} placeholder={"Birthday"} type={"date"}/>
                    <div className="mar_check">
                        <p className="text_mln_f18_l18">Have account?</p>
                        <p className="text_mln_f18_l18" onClick={() => setIsLogin(true)}>Authorization</p>
                    </div>
                    <button className="mar_action" onClick={handleRegistation}>
                        <p className="text_mln_f18_l18">Registration</p>
                    </button>
                </div>
                </section>
            )}
        </>
    );
}

export default Authorization;
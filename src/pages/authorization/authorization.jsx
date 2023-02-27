/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import './authorization.css'

export const Authorization = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        // resolver: yupResolver(FormSchema),
    })

    const onSubmit = (data) => {
        console.log(JSON.stringify(data))
        console.log(errors)

        reset()
    }
    
    return (
        <form 
            className="container-personal-cabinet"
            onSubmit={handleSubmit(onSubmit)}
        >
            <p className='personal-cabinet-title'>Вход в личный кабинет</p>
            
            <div className='container-personal-cabinet-info-input'>
                <label>
                    Логин:
                    <input
                        // placeholder="Логин"
                        // autoFocus={true}
                        {...register('login', {
                            required: true
                        })}
                        // autoComplete="login"
                    />
                    <div>{errors?.login && <p>Error</p>}</div>
                </label>

                <label>
                    Пароль:
                    <input
                        // placeholder="Enter your password"
                        {...register('password', {
                            required: true
                        })}
                        type='password'
                        // autoComplete="current-password"
                    />
                    <div>{errors?.password && <p>Error</p>}</div>
                </label>

                <Link 
                    className='' 
                    to='/'
                >Забыли логин или пароль?</Link>
            </div>

            <button
                disabled={!isValid}
                type="submit"
            >Log in</button>
            <input disabled={!isValid} type='submit' />
        </form>
    )
}
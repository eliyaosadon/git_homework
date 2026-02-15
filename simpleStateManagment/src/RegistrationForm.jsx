import React, { useReducer } from 'react';

const initialState = {
    currentStep: 1,
    formData: {
        name: '', email: '', age: '',
        username: '', password: '', confirmPassword: '',
        newsletter: false, notifications: true, theme: 'light'
    },
    errors: {},
    isSubmitting: false,
    isCompleted: false
};

function formReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                formData: { ...state.formData, [action.data.field]: action.data.value },
                errors: { ...state.errors, [action.data.field]: null }
            };
        case 'SET_ERRORS':
            return { ...state, errors: action.data };
        case 'NEXT_STEP':
            return { ...state, currentStep: state.currentStep + 1, errors: {} };
        case 'PREV_STEP':
            return { ...state, currentStep: state.currentStep - 1, errors: {} };
        case 'SUBMIT_FORM':
            return { ...state, isCompleted: true };
        default:
            return state;
    }
}

export default function RegistrationForm() {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { formData, currentStep, errors } = state;

    const validateAndNext = () => {
        let newErrors = {};

        if (currentStep === 1) {
            if (!formData.name) newErrors.name = "Name required";
            if (!formData.email.includes('@')) newErrors.email = "Invalid email";
            if (Number(formData.age) < 18) newErrors.age = "Must be 18+";
        }
        else if (currentStep === 2) {
            if (formData.username.length < 3) newErrors.username = "Min 3 chars";
            if (formData.password.length < 6) newErrors.password = "Min 6 chars";
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords have to match";
        }

        if (Object.keys(newErrors).length > 0) {
            dispatch({ type: 'SET_ERRORS', data: newErrors });
        } else {
            dispatch({ type: 'NEXT_STEP' });
        }
    };

    if (state.isCompleted) return <div className="card"><h3>Registration succesful</h3></div>;

    return (
        <div style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', margin: '10px 0' }}>
            <h2>Step {currentStep}</h2>

            {currentStep === 1 && (
                <div>
                    <input placeholder="Full Name" value={formData.name} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', data: { field: 'name', value: e.target.value } })} />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    <input placeholder="Email" value={formData.email} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', data: { field: 'email', value: e.target.value } })} />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    <input type="number" placeholder="Age" value={formData.age} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', data: { field: 'age', value: e.target.value } })} />
                    {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
                </div>
            )}

            {currentStep === 2 && (
                <div>
                    <input placeholder="Username" value={formData.username} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', data: { field: 'username', value: e.target.value } })} />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', data: { field: 'password', value: e.target.value } })} />
                    <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', data: { field: 'confirmPassword', value: e.target.value } })} />
                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                </div>
            )}

            {currentStep === 3 && (
                <div>
                    <label>
                        <input type="checkbox" checked={formData.newsletter} onChange={(e) => dispatch({ type: 'UPDATE_FIELD', data: { field: 'newsletter', value: e.target.checked } })} />
                        Subscribe
                    </label>
                </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {currentStep > 1 && <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>}
                {currentStep < 3 ? (
                    <button onClick={validateAndNext}>Next</button>
                ) : (
                    <button onClick={() => dispatch({ type: 'SUBMIT_FORM' })}>Submit</button>
                )}
            </div>
        </div>
    );
}
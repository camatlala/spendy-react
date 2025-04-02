import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignUpForm from './components/SignUpForm.jsx'

createRoot(document.getElementById('root')).render(
    <section className='w-full h-full'>
    <App />
    </section>
)

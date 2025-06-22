import React, { useState, useEffect } from 'react';
import { Scissors, Calendar, Clock, User, ChevronRight, CheckCircle, ArrowLeft, Star, Crown, Sparkles, ChevronLeft, Eye, EyeOff } from 'lucide-react';

// --- DADOS MOCK (Consistentes com o Painel de Admin) ---
const mockProfessionalsData = [ 
    { id: 1, name: 'Bento Ribeiro', avatar: 'https://placehold.co/100x100/6366F1/E0E7FF?text=BR', role: 'Barbeiro Sênior' },
    { id: 2, name: 'Diego Martins', avatar: 'https://placehold.co/100x100/EC4899/FCE7F3?text=DM', role: 'Barbeiro Pleno' },
    { id: 3, name: 'Carla Souza', avatar: 'https://placehold.co/100x100/10B981/D1FAE5?text=CS', role: 'Estilista' } 
];

const mockServicesData = [
    { id: 1, name: 'Corte Social', duration: 45, price: 45.00, description: 'Corte clássico e elegante para o dia a dia.' },
    { id: 2, name: 'Barba e Corte', duration: 60, price: 90.00, description: 'O pacote completo para um visual impecável.' },
    { id: 3, name: 'Barboterapia', duration: 45, price: 60.00, description: 'Toalhas quentes, massagem e um barbear perfeito.' },
    { id: 4, name: 'Pintura', duration: 90, price: 120.00, description: 'Coloração profissional para um novo estilo.' },
];

const mockSubscriptions = [
    { id: 1, name: 'Clube Classic', price: 150, features: ['2 Cortes de Cabelo/mês', '1 Barba/mês', '5% OFF em Produtos'], icon: <Scissors/>, best: false },
    { id: 2, name: 'Clube Premium', price: 250, features: ['4 Cortes de Cabelo/mês', '2 Barboterapias/mês', '10% OFF em Produtos', 'Acesso a eventos exclusivos'], icon: <Crown/>, best: true },
    { id: 3, name: 'Clube VIP', price: 400, features: ['Cortes e Barbas Ilimitados', '1 Serviço de Química/mês', '15% OFF em Produtos', 'Agendamento Prioritário'], icon: <Sparkles/>, best: false },
]

// --- COMPONENTES DA UI ---

const Header = ({ onBookNow, onLogin, onRegister, isLoggedIn, onLogout }) => (
    <header className="bg-zinc-900 text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-30">
        <h1 className="text-3xl font-bold tracking-tight text-amber-400">Barber<span className="text-white">PRO</span></h1>
        <div className="flex items-center gap-4">
            {isLoggedIn ? (
                <>
                    <span className="font-semibold">Olá, Admin!</span>
                    <button onClick={onLogout} className="bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-zinc-600 transition-colors text-sm">Sair</button>
                </>
            ) : (
                <>
                    <button onClick={onLogin} className="font-semibold hover:text-amber-400 transition-colors">Entrar</button>
                    <button onClick={onRegister} className="bg-amber-500 text-zinc-900 font-bold py-2 px-6 rounded-lg hover:bg-amber-400 transition-colors">Criar Conta</button>
                </>
            )}
        </div>
    </header>
);

const Footer = () => (
    <footer className="bg-zinc-900 text-center p-6 mt-16 border-t border-zinc-800">
        <p className="text-sm text-zinc-400">&copy; {new Date().getFullYear()} BarberPRO. Todos os direitos reservados.</p>
        <p className="text-xs text-zinc-500 mt-2">Rua da Barbearia, 123 - São Paulo, SP</p>
    </footer>
);

const ProgressBar = ({ step }) => {
    const steps = ['Serviço', 'Profissional', 'Horário', 'Confirmação'];
    return (
        <div className="flex justify-between items-center mb-10 px-2">
            {steps.map((s, i) => (
                <React.Fragment key={s}>
                    <div className="flex flex-col items-center z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${i < step ? 'bg-amber-500 text-zinc-900' : 'bg-zinc-700 text-zinc-400'}`}>
                            {i < step -1 ? <CheckCircle/> : i + 1}
                        </div>
                        <p className={`mt-2 text-xs font-semibold text-center ${i < step ? 'text-amber-500' : 'text-zinc-400'}`}>{s}</p>
                    </div>
                    {i < steps.length - 1 && <div className={`flex-1 h-1 -mx-2 ${i < step - 1 ? 'bg-amber-500' : 'bg-zinc-700'}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );
};


// --- SEÇÕES DA LANDING PAGE ---
const HeroSection = ({ onBookNow }) => (
    <section className="text-center py-20 px-4 bg-zinc-900 text-white">
        <h2 className="text-5xl font-extrabold mb-4 leading-tight">A Arte da Barbearia Moderna</h2>
        <p className="max-w-2xl mx-auto text-lg text-zinc-300 mb-8">Onde tradição e estilo se encontram. Transforme seu visual com os melhores profissionais da cidade.</p>
        <button onClick={onBookNow} className="bg-amber-500 text-zinc-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">Agende Seu Horário</button>
    </section>
);

const ServicesSection = () => (
    <section id="services" className="py-16 px-4">
        <h3 className="text-4xl font-bold text-center mb-10 text-white">Nossos Serviços</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {mockServicesData.map(service => (
                <div key={service.id} className="bg-zinc-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-amber-400 mb-2">{service.name}</h4>
                    <p className="text-zinc-300 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-zinc-300">{service.duration} min</span>
                        <span className="text-xl font-bold text-white">R$ {service.price.toFixed(2)}</span>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const ProfessionalsSection = () => (
     <section id="professionals" className="py-16 px-4 bg-zinc-900">
        <h3 className="text-4xl font-bold text-center mb-10 text-white">Nossa Equipe</h3>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProfessionalsData.map(prof => (
                 <div key={prof.id} className="text-center p-4 rounded-lg bg-zinc-800 group transition-all duration-300 hover:bg-zinc-700">
                    <img src={prof.avatar} alt={prof.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-zinc-700 group-hover:border-amber-500 transition-all"/>
                    <p className="font-bold text-xl text-white">{prof.name}</p>
                    <p className="text-md text-amber-400">{prof.role}</p>
                </div>
            ))}
        </div>
    </section>
);

const SubscriptionsSection = () => (
    <section id="subscriptions" className="py-16 px-4">
        <h3 className="text-4xl font-bold text-center mb-2 text-white">Clube BarberPRO</h3>
        <p className="text-zinc-400 text-center mb-10">Serviços exclusivos e vantagens para membros.</p>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {mockSubscriptions.map(sub => (
                <div key={sub.id} className={`bg-zinc-800 p-8 rounded-lg shadow-lg flex flex-col ${sub.best ? 'border-2 border-amber-500' : 'border-2 border-zinc-700'}`}>
                    <div className="text-amber-400 mb-4">{React.cloneElement(sub.icon, { size: 32 })}</div>
                    <h4 className="text-2xl font-bold text-white mb-2">{sub.name}</h4>
                    <p className="text-4xl font-extrabold text-white mb-6">R${sub.price}<span className="text-base font-normal text-zinc-400">/mês</span></p>
                    <ul className="space-y-3 text-zinc-300 mb-8 flex-grow">
                        {sub.features.map(feat => <li key={feat} className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500"/><span>{feat}</span></li>)}
                    </ul>
                    <button onClick={() => alert(`Você selecionou o plano ${sub.name}. Próximo passo: pagamento!`)} className={`w-full mt-auto font-bold py-3 px-6 rounded-lg transition-colors ${sub.best ? 'bg-amber-500 text-zinc-900 hover:bg-amber-400' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}>Assinar Plano</button>
                </div>
            ))}
        </div>
    </section>
);


// --- ETAPAS DO AGENDAMENTO ---
const SelectService = ({ onSelect }) => (<div><h2 className="text-2xl font-bold text-center mb-6 text-white">1. Escolha o serviço</h2><div className="space-y-3">{mockServicesData.map(service => (<div key={service.id} onClick={() => onSelect(service)} className="flex justify-between items-center p-4 rounded-lg bg-zinc-800 shadow-md hover:bg-zinc-700 transition-all cursor-pointer"><div><p className="font-semibold text-white">{service.name}</p><p className="text-sm text-zinc-400">{service.duration} min</p></div><div className="flex items-center gap-4"><p className="font-bold text-lg text-amber-400">R$ {service.price.toFixed(2)}</p><ChevronRight className="text-zinc-500"/></div></div>))}</div></div>);
const SelectProfessional = ({ onSelect }) => (<div><h2 className="text-2xl font-bold text-center mb-6 text-white">2. Escolha o seu profissional</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-6">{mockProfessionalsData.map(prof => (<div key={prof.id} onClick={() => onSelect(prof)} className="text-center p-4 rounded-lg bg-zinc-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"><img src={prof.avatar} alt={prof.name} className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-transparent hover:border-amber-500"/><p className="font-semibold text-white">{prof.name}</p><p className="text-sm text-amber-400">{prof.role}</p></div>))}</div></div>);

const CalendarComponent = ({ onDateSelect, selectedDate }) => {
    const [date, setDate] = useState(selectedDate || new Date());
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = Array.from({length: lastDayOfMonth.getDate()}, (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1));
    const startingDayIndex = firstDayOfMonth.getDay();
    const changeMonth = (offset) => setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1));
    return (
        <div className="bg-zinc-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4"><button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-zinc-700"><ChevronLeft/></button><h3 className="font-bold text-lg text-white">{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</h3><button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-zinc-700"><ChevronRight/></button></div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-zinc-400 mb-2">{daysOfWeek.map(day => <div key={day}>{day}</div>)}</div>
            <div className="grid grid-cols-7 gap-2 text-center">{Array(startingDayIndex).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}{daysInMonth.map(day => (<button key={day} onClick={() => onDateSelect(day)} className={`p-2 rounded-full transition-colors ${selectedDate?.toDateString() === day.toDateString() ? 'bg-amber-500 text-zinc-900 font-bold' : 'hover:bg-zinc-700'}`}>{day.getDate()}</button>))}</div>
        </div>
    );
}

const SelectDateTime = ({ onSelect, selectedDate, onDateChange }) => {
    const getAvailableSlots = (date) => { if (!date) return []; const day = date.getDate(); if (day % 3 === 0) { return ['09:00', '10:30', '11:00', '14:00']; } else if (day % 2 === 0) { return ['09:30', '11:30', '14:30', '16:00', '17:00']; } return ['09:00', '10:30', '11:00', '14:00', '15:30', '16:00', '17:30']; };
    const availableSlots = getAvailableSlots(selectedDate);
    return (<div><h2 className="text-2xl font-bold text-center mb-6 text-white">3. Escolha a data e o horário</h2><div className="space-y-6"><CalendarComponent selectedDate={selectedDate} onDateSelect={onDateChange}/><div className="grid grid-cols-3 md:grid-cols-5 gap-3">{selectedDate && availableSlots.map(slot => (<button key={slot} onClick={() => onSelect({date: selectedDate, time: slot})} className="p-3 bg-zinc-700 text-amber-400 font-semibold rounded-lg shadow-md hover:bg-amber-500 hover:text-zinc-900 transition-all">{slot}</button>))}</div></div></div>);
};

const Confirmation = ({ bookingDetails, onConfirm }) => (<div><h2 className="text-2xl font-bold text-center mb-6 text-white">4. Confirme o seu agendamento</h2><div className="bg-zinc-800 p-6 rounded-lg shadow-xl space-y-4 border border-zinc-700">
    <div className="flex justify-between items-center pb-2 border-b border-zinc-700"><span className="text-zinc-400">Serviço</span><span className="font-bold text-white">{bookingDetails.service.name}</span></div>
    <div className="flex justify-between items-center pb-2 border-b border-zinc-700"><span className="text-zinc-400">Profissional</span><span className="font-bold text-white">{bookingDetails.professional.name}</span></div>
    <div className="flex justify-between items-center pb-2 border-b border-zinc-700"><span className="text-zinc-400">Data e Hora</span><span className="font-bold text-white">{bookingDetails.dateTime.date.toLocaleDateString('pt-BR')} às {bookingDetails.dateTime.time}</span></div>
    <div className="flex justify-between items-center pt-2 text-lg"><span className="font-semibold text-zinc-200">Total</span><span className="font-bold text-2xl text-amber-400">R$ {bookingDetails.service.price.toFixed(2)}</span></div>
</div><button onClick={onConfirm} className="w-full mt-8 bg-green-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-green-700 transition-all text-lg flex items-center justify-center gap-2"><CheckCircle/> Confirmar Agendamento</button></div>);


// --- PÁGINAS ---

const LandingPage = ({ onBookNow, onLogin, onRegister }) => (
    <div className="bg-zinc-950 text-white">
        <Header onBookNow={onBookNow} onLogin={onLogin} onRegister={onRegister} />
        <main>
            <HeroSection onBookNow={onBookNow} />
            <ServicesSection />
            <ProfessionalsSection />
            <SubscriptionsSection />
        </main>
        <Footer />
    </div>
);

const BookingFlow = ({ onExit }) => {
    const [step, setStep] = useState(1);
    const [bookingDetails, setBookingDetails] = useState({ professional: null, service: null, dateTime: { date: new Date(), time: null } });
    const handleSelectService = (service) => { setBookingDetails(prev => ({ ...prev, service })); setStep(2); };
    const handleSelectProfessional = (professional) => { setBookingDetails(prev => ({ ...prev, professional })); setStep(3); };
    const handleSelectDateTime = (dateTime) => { setBookingDetails(prev => ({ ...prev, dateTime })); setStep(4); };
    const handleDateChange = (date) => { setBookingDetails(prev => ({...prev, dateTime: { ...prev.dateTime, date }})) };
    const handleConfirm = () => { alert(`Agendamento para ${bookingDetails.service.name} com ${bookingDetails.professional.name} em ${bookingDetails.dateTime.date.toLocaleDateString()} às ${bookingDetails.dateTime.time} confirmado com sucesso!`); onExit(); };
    const handleBack = () => { if(step > 1) setStep(step - 1); else onExit(); }
    const renderStep = () => {
        switch (step) {
            case 1: return <SelectService onSelect={handleSelectService} />;
            case 2: return <SelectProfessional onSelect={handleSelectProfessional} />;
            case 3: return <SelectDateTime onSelect={handleSelectDateTime} selectedDate={bookingDetails.dateTime.date} onDateChange={handleDateChange} />;
            case 4: return <Confirmation bookingDetails={bookingDetails} onConfirm={handleConfirm}/>;
            default: return <SelectService onSelect={handleSelectService} />;
        }
    };
    return (<div className="bg-zinc-900 min-h-screen text-white"><header className="bg-zinc-950 p-4 shadow-lg flex justify-between items-center sticky top-0 z-30"><h1 className="text-3xl font-bold tracking-tight text-amber-400">Barber<span className="text-white">PRO</span></h1><button onClick={handleBack} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-amber-400"><ArrowLeft size={16}/> {step === 1 ? 'Voltar para o Início' : 'Voltar'}</button></header><main className="container mx-auto p-4 max-w-2xl"><div className="bg-zinc-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-zinc-700"><ProgressBar step={step}/>{renderStep()}</div></main></div>);
};

const AuthPage = ({ onExit, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="bg-zinc-900 min-h-screen text-white flex flex-col">
             <header className="bg-zinc-950 p-4 shadow-lg flex justify-between items-center z-10">
                <h1 className="text-3xl font-bold tracking-tight text-amber-400 cursor-pointer" onClick={onExit}>Barber<span className="text-white">PRO</span></h1>
                <button onClick={onExit} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-amber-400"><ArrowLeft size={16}/> Voltar para o Início</button>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md m-4 bg-zinc-800 p-8 rounded-2xl shadow-lg border border-zinc-700">
                    <h2 className="text-3xl font-bold text-center mb-6 text-white">{isLogin ? 'Entrar na sua Conta' : 'Criar Nova Conta'}</h2>
                    <form className="space-y-4" onSubmit={onLoginSuccess}>
                        {!isLogin && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="text-sm font-bold text-zinc-400">Nome</label><input type="text" required className="w-full mt-2 p-3 bg-zinc-700 rounded-lg border border-zinc-600 focus:border-amber-500 focus:ring-amber-500 outline-none" /></div>
                                <div><label className="text-sm font-bold text-zinc-400">Telefone</label><input type="tel" placeholder="(xx) xxxxx-xxxx" required className="w-full mt-2 p-3 bg-zinc-700 rounded-lg border border-zinc-600 focus:border-amber-500 focus:ring-amber-500 outline-none" /></div>
                            </div>
                        )}
                         <div><label className="text-sm font-bold text-zinc-400">E-mail</label><input type="email" required className="w-full mt-2 p-3 bg-zinc-700 rounded-lg border border-zinc-600 focus:border-amber-500 focus:ring-amber-500 outline-none" /></div>
                        {!isLogin && (
                            <div><label className="text-sm font-bold text-zinc-400">Data de Nascimento</label><input type="date" required className="w-full mt-2 p-3 bg-zinc-700 rounded-lg border border-zinc-600 focus:border-amber-500 focus:ring-amber-500 outline-none appearance-none" /></div>
                        )}
                        <div className="relative"><label className="text-sm font-bold text-zinc-400">Senha</label><input type={showPassword ? 'text' : 'password'} required className="w-full mt-2 p-3 bg-zinc-700 rounded-lg border border-zinc-600 focus:border-amber-500 focus:ring-amber-500 outline-none" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-zinc-400 hover:text-white">{showPassword ? <EyeOff/> : <Eye/>}</button></div>
                        <button type="submit" className="w-full bg-amber-500 text-zinc-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors text-lg mt-6">{isLogin ? 'Entrar' : 'Criar Conta'}</button>
                    </form>
                    <p className="text-center text-sm text-zinc-400 mt-6">
                        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                        <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-amber-400 hover:underline ml-2">
                            {isLogin ? 'Crie agora' : 'Faça login'}
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
};

// --- APP PRINCIPAL ---
export default function App() {
    const [view, setView] = useState('landing'); // 'landing', 'booking', 'auth'
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        alert('Login/Cadastro efetuado com sucesso! (Simulação)');
        setIsLoggedIn(true);
        setView('landing'); // ou 'dashboard do cliente' no futuro
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleRegisterClick = () => {
        // Acessa a AuthPage e já deixa na aba de cadastro
        // Em uma implementação real, passaríamos um prop para definir a aba inicial
        // Por agora, o usuário pode clicar para trocar
        setView('auth');
    }

    switch(view) {
        case 'booking':
            return <BookingFlow onExit={() => setView('landing')} />;
        case 'auth':
            return <AuthPage onExit={() => setView('landing')} onLoginSuccess={handleLoginSuccess} />;
        default:
            return <LandingPage onBookNow={() => setView('booking')} onLogin={() => setView('auth')} onRegister={() => setView('auth')} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>;
    }
}

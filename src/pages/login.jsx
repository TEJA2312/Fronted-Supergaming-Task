import LoginForm from '../container/loginForm.jsx'

function LoginPage () {
  return (
    <section className='h-screen flex items-center'>

      <div className='w-1/2 h-screen' 
      style={{ backgroundImage: `url(https://cdn.dribbble.com/userupload/44105587/file/original-4a855d685fb35c412dd8c952bf103c9a.png?resize=2048x1603&vertical=center)`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' }} ></div>
       
      <div className='w-1/2 mx-auto'>
        <LoginForm />
      </div> 
    </section>
  )
}

export default LoginPage

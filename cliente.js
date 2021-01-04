class Cliente{
	constructor(nome,cpf,rg,dt_nascimento,fone,email){
		this.nome = nome	
		this.cpf = cpf
		this.rg = rg
		this.dt_nascimento = dt_nascimento
		this.fone = fone
		this.email = email
	}
}
class Bd{
	constructor(){
		let id = localStorage.getItem('id')
		
		if (id == null) {
			localStorage.setItem('id',0)
		}
	}
	getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId)+1
	}
	gravar(d){
		let id = this.getProximoId()
		localStorage.setItem(id,JSON.stringify(d))
		localStorage.setItem('id',id)
	}
	recuperarListaClientes(){
		let clientes = Array()
		let id = localStorage.getItem('id')

		for(let i =1; i <= id;i++){

			let cliente = JSON.parse(localStorage.getItem(i))
			if (cliente == null) {
				continue
			}
			cliente.id = i
			clientes.push(cliente)

		}
		return clientes
	}
	pesquisar(clientes){
		let clientesFiltrados = Array()
		clientesFiltrados = this.recuperarListaClientes()


		if (clientes.nome != '') {
		clientesFiltrados = clientesFiltrados.filter(c => c.nome == clientes.nome)}
		if (clientes.cpf != '') {
		clientesFiltrados = clientesFiltrados.filter(c => c.cpf == clientes.cpf)}
		if (clientes.rg != '') {
		clientesFiltrados = clientesFiltrados.filter(c => c.rg == clientes.rg)}
		if (clientes.dt_nascimento != '') {
		clientesFiltrados = clientesFiltrados.filter(c => c.dt_nascimento == clientes.dt_nascimento)}
		if (clientes.fone != '') {
		clientesFiltrados = clientesFiltrados.filter(c => c.fone == clientes.fone)}
		if (clientes.email != '') {
		clientesFiltrados = clientesFiltrados.filter(c => c.email == clientes.email)}

		return clientesFiltrados
	}
	remover(id){

		localStorage.removeItem(id)
	}
}
let bd = new Bd()

function cadastroCliente() {
	
	let nome = document.getElementById('nome')
	let cpf = document.getElementById('cpf')
	let rg = document.getElementById('rg')
	let dt_nascimento = document.getElementById('dt_nascimento')
	let fone = document.getElementById('fone')
	let email = document.getElementById('email')

	let cliente = new Cliente(

		nome.value,
		cpf.value,
		rg.value,
		dt_nascimento.value,
		fone.value,
		email.value
	)
	
	bd.gravar(cliente)
	window.location.reload()
	
	
}
function listarClientes(clientes = Array(),filter = false) {
	
	if (clientes.length == 0) {
		clientes = bd.recuperarListaClientes()
	}

	let campoListaClientes = document.getElementById('campoListaClientes')
	campoListaClientes.innerHTML = ''

	clientes.forEach(function (c) {

		let linhas = campoListaClientes.insertRow()

		linhas.insertCell(0).innerHTML = c.nome
		linhas.insertCell(1).innerHTML = c.cpf
		linhas.insertCell(2).innerHTML = c.rg
		linhas.insertCell(3).innerHTML = c.dt_nascimento
		linhas.insertCell(4).innerHTML = c.fone
		linhas.insertCell(5).innerHTML = c.email

		let btn = document.createElement('button')
		btn.innerHTML = 'Excluir'
		btn.id = `id_cliente_${c.id}`
		btn.onclick = function () {	
			let id = this.id.replace('id_cliente_','')
			bd.remover(id)
			window.location.reload()
		}
		linhas.insertCell(6).append(btn)
	})
}

function pesquisarClientes() {
	
	let nome = document.getElementById('nome').value
	let cpf = document.getElementById('cpf').value
	let rg = document.getElementById('rg').value
	let dt_nascimento = document.getElementById('dt_nascimento').value
	let fone = document.getElementById('fone').value
	let email = document.getElementById('email').value

	let cliente = new Cliente(nome,cpf,rg,dt_nascimento,fone,email)

	let clientes = bd.pesquisar(cliente)

	listarClientes(clientes,true)
}
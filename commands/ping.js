import {ICommand} from 'wokcommands'
module.exports ={
    category: 'test',
    description: 'đang xử lý',
    slash:true,
    callback : ({ })=>{
        return "pong"
    }
}
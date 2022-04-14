import {ICommand} from 'wokcommands'
module.exports ={
    category: 'test',
    description: 'đang xử lý',
    slash:"both",
    testOnly: true,
    callback : ({ })=>{
        return "pong"
    }
}
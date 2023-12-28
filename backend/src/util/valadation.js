module.exports=(formatOfError)=>{
    return formatOfError.map((err)=>{
        return err.msg
    })

}
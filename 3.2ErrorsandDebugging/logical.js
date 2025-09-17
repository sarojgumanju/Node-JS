const logicalError = () => {
    const num = 5;
    if(num=10){
        console.log(num);
    }
    else{
        console.log("The number is not equal to 10.")
    }
};

module.exports = logicalError;
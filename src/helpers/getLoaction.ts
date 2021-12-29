
export const getUserLocation = async(): Promise<[number, number]> => {
    return new  Promise( (resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(
            ({ coords:{ latitude, longitude } }) => {
                resolve([longitude, latitude]);
            },
            (err)=>{
                alert('error');
                console.log(err)
                reject();
            }
        )
    })
};

export const getUserLocation = async(): Promise<[number, number]> => {
    return new  Promise( (resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(
            ({ coords:{ latitude, longitude } }) => {
                resolve([longitude, latitude]);
            },
            (err)=>{
                alert('Se nesecita dar permiso para usar su ubicación');
                console.log(err)
                reject();
            }
        )
    })
};
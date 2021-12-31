import { showAlert } from './showAlert';

export const getUserLocation = async(): Promise<[number, number]> => {
    return new  Promise( (resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(
            ({ coords:{ latitude, longitude } }) => {
                resolve([longitude, latitude]);
            },
            (err)=>{
                
                showAlert({ icon: 'error', title: 'Error al obtener la ubicación', text: 'Para usar esta app es necesario otorgar permiso para usar tu ubicación' })

                console.log(err)
                reject();
            }
        )
    })
};
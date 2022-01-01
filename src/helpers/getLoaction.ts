import { showAlert } from './showAlert';

export const getUserLocation = async(): Promise<[number, number]> => {
    return new  Promise( (resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(
            ({ coords:{ latitude, longitude } }) => {
                resolve([longitude, latitude]);
            },
            (err)=>{
                
                showAlert({ icon: 'error', title: 'Failed to get location', text: 'To use this app it is necessary to grant permission to use your location' })

                console.log(err)
                reject();
            }
        )
    })
};
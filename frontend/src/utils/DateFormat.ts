export default function DateFormat(fullDate:string){
  const date = fullDate.split('T')[0].split('-').reverse().join('/');
  return date
}
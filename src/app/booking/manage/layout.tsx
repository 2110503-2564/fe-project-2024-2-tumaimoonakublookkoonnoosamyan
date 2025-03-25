export default function ManageReservationLayout(
    {children,dashboard} : 
    {children:React.ReactNode,dashboard:React.ReactNode,manage:React.ReactNode}){
    return(
        <div className="flex flex-col w-full">
            {children}
            { dashboard }
        </div>
    );

}
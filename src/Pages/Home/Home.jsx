import UseRole from "../../Hooks/UseRole/UseRole";
import AdminHome from "../Admin/AdminHome/AdminHome";
import AgentHome from "../Agent/AgentHome/AgentHome";
import Loading from "../Shared/Loading/Loading";
import UsersHome from "../Users/UsersHome/UsersHome";


const Home = () => {
    const { role, refetchRole, roleLoading } = UseRole()

    if (roleLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen pt-28">
            <div className="md:w-[80%] w-[90%] mx-auto">
                {
                    role === "user" ? <UsersHome /> : role === "agent" ? <AgentHome /> : <AdminHome />
                }
            </div>
        </div>
    );
};

export default Home;

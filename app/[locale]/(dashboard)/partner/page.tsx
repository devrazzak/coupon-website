export default function PartnerDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Partner Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">
                        Total Products
                    </h2>
                    <p className="text-3xl font-bold">48</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
                    <p className="text-3xl font-bold">156</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                    <p className="text-3xl font-bold">$5,678</p>
                </div>
            </div>
        </div>
    );
}

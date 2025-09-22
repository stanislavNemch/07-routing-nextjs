export default function FilterLayout({
    children,
    sidebar,
}: {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex", gap: "20px", padding: "16px" }}>
            {sidebar}
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
}

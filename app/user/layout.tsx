import SideNav from '@/app/ui/user/side-nav';

export default function Layout({ children }: { children: React.ReactNode } ) {
    return (
        <div>
            <SideNav />
            <div>{children}</div>
        </div>
    );
}

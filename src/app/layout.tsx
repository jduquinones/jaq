import "./globals.css";

export const metadata = {
title: 'JAQ Construcciones',
description: 'Transformamos espacios en obras maestras',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="es" suppressHydrationWarning={true}>
<body>{children}</body>
</html>
);
}





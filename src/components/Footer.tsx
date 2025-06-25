export default function Footer() {
  return (
    <footer className="bg-card border-t border-border h-14 flex items-center">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} EDU_PORT. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 
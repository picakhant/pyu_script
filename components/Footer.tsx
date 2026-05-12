export default function Footer() {
  return (
    <footer className="w-full overflow-x-hidden bg-base-200/50 backdrop-blur border-t border-base-content/10 text-base-content mt-auto">
      
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Left Side (Logo & Text) */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-center sm:text-left w-full sm:w-auto">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex shrink-0 items-center justify-center border border-primary/20">
            <span className="text-primary font-bold font-mono">{`~/`}</span>
          </div>
          <p className="font-mono text-sm opacity-80">
            <strong>Pyu Script</strong> <br className="hidden sm:block" />
            <span className="sm:hidden"> - </span>Secured Project Collection for UCS Pyay.
          </p>
        </div> 
        
        {/* Right Side (Action Links) */}
        <div className="flex items-center justify-center gap-6 w-full sm:w-auto">
          
          <a href="https://t.me/your_ucs_group" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors tooltip tooltip-top sm:tooltip-left" data-tip="Request Invite Code">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </a>
          
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-base-content transition-colors tooltip tooltip-top sm:tooltip-left" data-tip="Source Code">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
        
      </div>
    </footer>
  );
}
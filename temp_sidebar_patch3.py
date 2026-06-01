from pathlib import Path
path = Path('src/app/components/layout/Sidebar.tsx')
text = path.read_text(encoding='utf-8')
old = "  const [caissesOpen, setCaissesOpen] = useState(() => caissesActive(activeView));\n  const [tarecOpen, setTarecOpen] = useState(() => activeView === 'saisie-anomalies');\n"
new = "  const [tarecOpen, setTarecOpen] = useState(() => activeView === 'saisie-anomalies');\n"
text = text.replace(old, new)
old2 = "        <div\n          className={`relative flex items-center gap-3 py-2.5 pl-3 pr-2 text-[13px] cursor-pointer border-r-[3px] transition-colors ${\n            isTarecActive\n              ? 'bg-[#e3ebf5] border-[#1a5fa8] text-[#1a5fa8] font-semibold'\n              : 'border-transparent text-[#5c6b82] hover:bg-[#e8edf3]'\n          }`}\n          onClick={() => setTarecOpen(!tarecOpen)}\n          data-testid="nav-tarec"\n        >\n          <NavIconContrat />\n          <span className="flex-1 leading-tight">Contrats TAREC</span>\n          <ChevronRight\n            className={`w-3.5 h-3.5 shrink-0 text-[#9aa8bc] transition-transform duration-200 ${tarecOpen ? 'rotate-90' : ''}`}\n          />\n        </div>\n\n        {tarecOpen && (\n          <div className={`${isTarecActive ? 'bg-[#e8eef5]' : 'bg-[#eef2f6]'}`}>
            <div
              className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                isTarecActive
                  ? 'text-[#1a5fa8] font-semibold'
                  : 'text-[#5c6b82] hover:text-[#1a5fa8]'
              }`}
              onClick={() => onSetView('saisie-anomalies')}
              data-testid="subnav-saisie-anomalies"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
              Saisie des anomalies
            </div>
          </div>
        )}"
new2 = "        {role === 'CCO' && (\n          <>\n            <div\n              className={`relative flex items-center gap-3 py-2.5 pl-3 pr-2 text-[13px] cursor-pointer border-r-[3px] transition-colors ${\n                isTarecActive\n                  ? 'bg-[#e3ebf5] border-[#1a5fa8] text-[#1a5fa8] font-semibold'\n                  : 'border-transparent text-[#5c6b82] hover:bg-[#e8edf3]'\n              }`}\n              onClick={() => setTarecOpen(!tarecOpen)}\n              data-testid="nav-tarec"\n            >\n              <NavIconContrat />\n              <span className="flex-1 leading-tight">Contrats TAREC</span>\n              <ChevronRight\n                className={`w-3.5 h-3.5 shrink-0 text-[#9aa8bc] transition-transform duration-200 ${tarecOpen ? 'rotate-90' : ''}`}\n              />\n            </div>\n\n            {tarecOpen && (\n              <div className={`${isTarecActive ? 'bg-[#e8eef5]' : 'bg-[#eef2f6]'}`}>
                <div
                  className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                    isTarecActive
                      ? 'text-[#1a5fa8] font-semibold'
                      : 'text-[#5c6b82] hover:text-[#1a5fa8]'
                  }`}
                  onClick={() => onSetView('saisie-anomalies')}
                  data-testid="subnav-saisie-anomalies"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
                  Saisie des anomalies
                </div>
              </div>
            )}\n          </>\n        )}"
if old2 not in text:
    raise SystemExit('Old block not found')
path.write_text(text.replace(old2, new2), encoding='utf-8')
print('patched3')

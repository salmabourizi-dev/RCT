from pathlib import Path
path = Path('src/app/components/layout/Sidebar.tsx')
text = path.read_text(encoding='utf-8')
old2 = '''        {sidebarOpen && (
          <div className={`${isCaissesActive ? 'bg-[#e8eef5]' : 'bg-[#eef2f6]'}`}>
            <div
              className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                isCaissesActive
                  ? 'text-[#1a5fa8] font-semibold'
                  : 'text-[#5c6b82] hover:text-[#1a5fa8]'
              }`}
              onClick={() => onSetView('saisie')}
              data-testid="subnav-saisie"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
              Saisie / Modification
            </div>
          </div>
        )}'''
new2 = '''        {sidebarOpen && (
          <div className={`${isCaissesActive ? 'bg-[#e8eef5]' : 'bg-[#eef2f6]'}`}>
            {role === 'CCO' ? (
              <div
                className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                  isCaissesActive
                    ? 'text-[#1a5fa8] font-semibold'
                    : 'text-[#5c6b82] hover:text-[#1a5fa8]'
                }`}
                onClick={() => onSetView('saisie')}
                data-testid="subnav-saisie"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
                Saisie / Modification
              </div>
            ) : (
              supervisorItems.map(item => {
                const active = activeView === item.view;
                return (
                  <div
                    key={item.view}
                    className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                      active ? 'text-[#1a5fa8] font-semibold' : 'text-[#5c6b82] hover:text-[#1a5fa8]'
                    }`}
                    onClick={() => onSetView(item.view)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
                    {item.label}
                  </div>
                );
              })
            )}
          </div>
        )}'''
if old2 not in text:
    raise SystemExit('Old block not found')
path.write_text(text.replace(old2, new2), encoding='utf-8')
print('patched2')

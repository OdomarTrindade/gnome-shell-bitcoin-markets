import * as Gio from '@imports/Gio-2.0';
import * as GLib from '@imports/GLib-2.0';

import * as Gtk3 from '@imports/Gtk-3.0';
import * as Gtk4 from '@imports/Gtk-4.0';

import prefs from './prefs';

class PrefsAppWindow {
  constructor(private app: Gtk3.Application) {}

  getWindow(): Gtk3.Window {
    const windowConfig = {
      application: this.app,
      default_height: 600,
      default_width: 800,
    };
    let window;
    switch ((imports.gi as any).versions.Gtk) {
      case '3.0':
        window = new Gtk3.ApplicationWindow(windowConfig);
        window.add(prefs.buildPrefsWidget());
        window.show_all();
        break;
      case '4.0':
        window = new Gtk4.ApplicationWindow(windowConfig as any);
        window.set_child(prefs.buildPrefsWidget());
        break;
    }

    return window;
  }
}

const application = new Gtk3.Application({
  application_id: 'org.gnome.GnomeShellScreenshot.PrefsTestApp',
  flags: Gio.ApplicationFlags.FLAGS_NONE,
});

application.connect('activate', (app) => {
  let activeWindow = app.active_window;

  if (!activeWindow) {
    const imageViewerWindow = new PrefsAppWindow(app);
    activeWindow = imageViewerWindow.getWindow();
  }

  activeWindow.present();
});

application.run(null);

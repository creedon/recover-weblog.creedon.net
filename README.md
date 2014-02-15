recover-weblog.creedon.net
==========================

Javascript to assist me in recovering some lost blog posts for weblog.creedon.net from www.archive.org.

Use
===

Go to the starting webpage you want to recover blog posts from on archive.org. For example < https://web.archive.org/web/20001211084000/http://weblog.creedon.net/2000/03/30 >.

In Chrome console run the following code to load recovery code...

    var script = document.createElement ( 'script' );
    
    script.type = 'text/javascript';
    script.src = 'https://github.com/creedon/recover-weblog.creedon.net/raw/master/scrape.js';
    
    ( document.getElementsByTagName ( 'head' ) [ 0 ] || document.getElementsByTagName ( 'body' ) [ 0 ] ).appendChild ( script );

Now just run a command like...

    scrape ( { days : 1, uuid : 123, getBlogEntries : getBlogEntriesA } )

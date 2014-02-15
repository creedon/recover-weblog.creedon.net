// Use a more recent version of jQuery than the one that is used by archive.org

var newscript = document.createElement ( 'script' );

newscript.type = 'text/javascript';
newscript.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';

( document.getElementsByTagName ( 'head' ) [ 0 ] || document.getElementsByTagName ( 'body' ) [ 0 ] ).appendChild ( newscript );

function getBlogEntriesD ( ) {

    // Fourth variant of get blog entries
    
    console.log ( $page );
    
    jq( 'strong', $page ).filter ( function ( ) {
    
        return jq( this ).text ( ).trim ( ).match ( '^.*, .* \\d{1,2}, \\d{4}$' );
        
        } ).closest ( 'tr' ).next ( ).find ( 'table table table' ).each ( function ( index ) {
        
		console.log ( i + ' ' + index );
		
        var tag = '';
        var t = jq( 'tr:last', this );
        
		var link = jq( 'a:first', t );
		var title = link.text ( ).trim ( ).replace ( /"/g, '""' );
        
		if ( ! title ) {
		
			debugger;
			
			}
			
		var slug = title.match ( /[\w ]/g ).join ( '' ).replace ( / /g, '-' ).toLowerCase ( );
        
        link = link.length ? link.attr ( 'href' ) : '';
        
		var html = htmlEncode ( tag + '\n\n' + jq( 'td', t ).html ( ).trim ( ) + '\n\n[source](' + link + ')' ).replace ( /"/g, '""' );
		
		output = output + uuid + '\t' + uuid + '\t"' + title + '"\t' + slug + '\t"' + html + '"\t"' + html + '"\tdraft\t1\t' + seconds + '\t1\t' + seconds + '\t1\t' + seconds + '\t1\n';
		
		uuid++;
		
		console.log ( t [ 0 ] );
		console.log ( title );
    
		console.log ( link );
		console.log ( tag );
		console.log ( slug );
		console.log ( html );
		
		} );
		
	}

function getBlogEntriesE ( ) {

    // Fifth variant of get blog entries
    
    jq( 'b', $page ).filter ( function ( ) {
    
        return jq( this ).text ( ).trim ( ).match ( '^.*, .* \\d{1,2}, \\d{4}$' );
        
        } ).closest ( 'tr' ).next ( ).find ( 'table tr:odd td' ).each ( function ( index ) {
        
		console.log ( i + ' ' + index );
		
		var link = jq( 'a:first', this );
        var tag = '';
        
		var title = link.text ( ).trim ( ).replace ( /"/g, '""' );
        
		if ( ! title ) {
		
			debugger;
			
			}
			
		var slug = title.match ( /[\w ]/g ).join ( '' ).replace ( / /g, '-' ).toLowerCase ( );
        
        link = link.length ? link.attr ( 'href' ) : '';
        
		var html = htmlEncode ( tag + '\n\n' + $( this ).html ( ).trim ( ) + '\n\n[source](' + link + ')' ).replace ( /"/g, '""' );
		
		output = output + uuid + '\t' + uuid + '\t"' + title + '"\t' + slug + '\t"' + html + '"\t"' + html + '"\tdraft\t1\t' + seconds + '\t1\t' + seconds + '\t1\t' + seconds + '\t1\n';
		
		uuid++;
		
		console.log ( $( this ) [ 0 ] );
		console.log ( title );
    
		console.log ( link );
		console.log ( tag );
		console.log ( slug );
		console.log ( html );
		
		} );
		
	}

function getCurrentPageDate ( )

	{
	
	var dateString = jq( '.hCalendarMonthYearRow', $page ).text ( );
	var dayString = jq( '.hCalendarDayCurrent', $page ).text ( );
	
	dateString = dateString.replace ( ' ', ' ' + dayString + ' ' );
	
	return new Date ( dateString );
	
	}

function getPreviousPageUrl ( ) {
	
	var previousHCalendarDayLinked = jq( '.hCalendarDayCurrent', $page ).prevAll ( '.hCalendarDayLinked' );
	var url = '';
	
	function getHCalendarDayLinkedUrl ( o ) {
	
		var url = o.slice ( 0, 1 ).find ( 'a' ).attr ( 'href' );
		
		return url;
		
		}
		
	// check current calendar row for previous hCalendarDayLinked class
	
	if ( previousHCalendarDayLinked.length ) {
  		
		url = getHCalendarDayLinkedUrl ( previousHCalendarDayLinked );
		
  		}
  		
  		else {
  		
			// traverse previous calendar rows for .hCalendarDayLinked
			
            console.log ( jq.fn.jquery );
            
			previousHCalendarDayLinked = jq( '.hCalendarDayCurrent', $page ).parent ( ).prevUntil ( 'table' ).find ( '.hCalendarDayLinked:last' ).last ( );
			
			}
			
	if ( previousHCalendarDayLinked.length ) {
		
		url = getHCalendarDayLinkedUrl ( previousHCalendarDayLinked );
		
		}
		
		else {
		
			url = jq( '.calendarNextPrevMonth a:first', $page ).attr ( 'href' );
			
			if ( typeof url == 'undefined' ) {
			
				url = jq( '.hCalendarTable', $page ).next ( 'div' );
				url = jq( ' a:first', url ).attr ( 'href' );
				
				}
		}
		
	return url;
	
	}

function htmlEncode ( value ) {

	/* create a in-memory div, set it's inner text (which jQuery automatically encodes)
	then grab the encoded contents back out.  The div never exists on the page. */
	
	return jq( '<div/>' ).text ( value ).html ( );
	
	}

function scrape ( args ) {

    // called like scrape ( { days : 1, uuid : 123, getBlogEntries : getBlogEntriesA } )
    
    jq = $;
    output = 'id\tuuid\ttitle\tslug\tmarkdown\thtml\tstatus\tauthor_id\tcreated_at\tcreated_by\tupdated_at\tupdated_by\tpublished_at\tpublished_by\n';
    url = document.location.href;
    uuid = args.uuid;
    
    var days = typeof args.days !== 'undefined' ? args.days : 1;
    
    console.log ( 'Using jQuery version ' + jq.fn.jquery + '.' );
    
    // Now we loop through n days of weblog posts
    
    for ( i = 0; i < days; i++ ) {

        console.log ( 'url : ' + url );
        
        jq.ajax ( {
        
            url : url,
            
            success : function ( data ) {
            
                $page = jq( data );
                
                seconds = Date.parse ( getCurrentPageDate ( ) );
                
                console.log ( seconds );
                
                // Use the function passed in as a parameter to grab the blog entries for the day
                
                args.getBlogEntries ( );
                
                },
                
            async : false,
            
            error : function ( x, s, e ) {
            
                console.log ( 'e' );
                
                alert ( 'error' );
            
                }
                
            } );
            
        url = getPreviousPageUrl ( );
        
        console.log ( 'previous url : ' + url );
        
        }

    var w = window.open ( )

    w.document.write ( '<pre>' + output + '\n\n' + uuid + '</pre>' );
    
    }

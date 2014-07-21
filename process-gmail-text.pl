#!/usr/bin/perl
use warnings;
use strict;

open(F, "../../pravdina-info.txt");
my @lines = <F>;
close F;

@lines = grep { !/^\d+/ } @lines;

foreach ( @lines ) {
	$_ =~ s/You have a new message: Via:  http:\/\/www.pravdina.info\/Message Details: Имя :  //;
	$_ =~ s/You have a new message: Via:  http:\/\/www.pravdina.info\/Message Details: Имя и фамилия :  //;
	$_ =~ s/Электронная почта\s*:\s*(.*)Год выпуска из ФТЛ (.*)1 \(если учились\)\s*:\s*/, /;
	$_ =~ s/Место проживания :  /, /;
	$_ =~ s/Место работы :  /, /;
	$_ =~ s/Сообщение \(появится в подписях под письмом\) :  /\n/;
	$_ =~ s/Sent on:(.*)Thank you!//;
}

open (F, '>pravdina-info-processed.txt');
print F join("\n", @lines);
close F;

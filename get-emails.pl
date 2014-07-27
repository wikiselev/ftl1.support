#!/usr/bin/perl
use warnings;
use strict;

sub uniq {
    my %seen;
    grep !$seen{$_}++, @_;
}

open(F, "pravdina-info-all.txt");
my @lines = <F>;
close F;

@lines = grep { /You(.*)have(.*)a(.*)new(.*)message:(.*)Via:(.*)http:(.*)www.pravdina.info(.*)/ } @lines;

foreach ( @lines ) {
	$_ =~ s/You(.*)have(.*)a(.*)new(.*)message:(.*)Via:(.*)http:(.*)www.pravdina.info(.*)Message Details:(.*)Имя(.*)Электронная почта\s*:\s*//;
	$_ =~ s/Год выпуска(.*)//;
}

chomp @lines;

my @filtered = uniq(@lines);

open (F, '>pravdina-info-emails.txt');
print F join("\n", @filtered);
# print F join("; ", @filtered);
close F;

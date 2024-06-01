<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <tracks>
            <!-- <xsl:apply-templates select="//dict[key='Artist' and key='Album' and not(key='Purchased' and following-sibling::*[1][self::true])]"/> -->
            <xsl:apply-templates select="//dict[key='Artist' and key='Album' and not(key[.='Purchased']/following-sibling::*[1][self::true])]"/>
        </tracks>
    </xsl:template>

    <xsl:template match="dict">
        <track>
            <artist><xsl:value-of select="string[preceding-sibling::key[1]='Artist']"/></artist>
            <album><xsl:value-of select="string[preceding-sibling::key[1]='Album']"/></album>
        </track>
    </xsl:template>

</xsl:stylesheet>
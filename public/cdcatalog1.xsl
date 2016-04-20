<?xml version="1.0" encoding="utf-8"?>
<!-- Edited by XMLSpy� -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head>
  <link href="http://cdn.amazeui.org/amazeui/2.6.1/css/amazeui.min.css" rel="stylesheet"/>
  </head>
  <body>
  <h2 >路线指南</h2>
    <!--<table class="table table-bordered" border="1">
      <tr bgcolor="#9acd32">
        <th>Title</th>
        <th>Artist</th>
      </tr>
      <xsl:for-each select="catalog/cd">
      <tr>
        <td><xsl:value-of select="title"/></td>
        <td><xsl:value-of select="artist"/></td>
      </tr>
      </xsl:for-each>
    </table>-->
    <ul class="am-list am-list-static am-list-border am-list-striped">
      <xsl:for-each select="DirectionWalkingResponse/result/routes/steps/content">
      <li ><xsl:value-of select="instructions"/></li>
      </xsl:for-each>
    </ul>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>
# Video Customer Service in Rails

An example application implementing Video Customer Service using Twilio.  For a
step-by-step tutorial, [visit this link](https://twilio.com/docs/howto/walkthrough/video-service/).

### Configuration

#### Setting Your Environment Variables

Are you using a bash shell? Use echo $SHELL to find out. For a bash shell, using the Gmail example, edit the ~/.bashrc or ~/.bashprofile file and add:
<pre>
export TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxx
export TWILIO_AUTH_TOKEN=yyyyyyyyyyyyyyyyy
export TWILIO_NUMBER=+15556667777
</pre>

Are you using Windows or Linux? You can read how to set variables [here](https://www.java.com/en/download/help/path.xml).

### Development

Getting your local environment setup to work with this app is similarly
easy.  After you configure your app with the steps above, use this guide to
get going locally:

1) Install the dependencies.
<pre>
bundle install
</pre>

2) Launch local development webserver
<pre>
rails server
</pre>

3) Open browser to [http://localhost:3000](http://localhost:3000).

4) Tweak away!

## Meta 

* No warranty expressed or implied.  Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.

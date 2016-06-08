
package com.everyparking.demo.soundcontrol;

import android.content.Context;
import android.media.AudioManager;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.lang.*;
import android.os.Handler;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import java.lang.Integer.*;
import java.lang.Float.*;


import java.util.*;

public class MainActivity extends AppCompatActivity {

    Button up;
    Button down;
    Button mute;
    TextView tv;
    private Timer timer;
    @Override

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        int volume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC); //volume은 0~15 사이어야 함
        setContentView(R.layout.activity_main);

        tv = (TextView) findViewById(R.id.textView);
      //  up = (Button) findViewById(R.id.UP);
      //  down = (Button) findViewById(R.id.DOWN);
      //  mute = (Button) findViewById(R.id.MUTE);
        volume = 1;
        audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, volume, AudioManager.FLAG_PLAY_SOUND);
        //volume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC); //volume은 0~15 사이어야 함
       // tv.setText("현재 볼륨은 : " + volume);



    }

    protected void onStart() {
        super.onStart();

    }

    protected void onResume() {

        super.onResume();
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (android.os.Build.VERSION.SDK_INT > 9) {
                    StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
                    StrictMode.setThreadPolicy(policy);
                }
                URL url = null;
                try {
                    //  url = new URL("http://www.naver.com/");
                    url = new URL("http://52.79.128.117:3000/soundapp");
                } catch (MalformedURLException e1) {
                }
                int a = 0;
                // while (a<8) {
                a++;
                try {
                    Thread.sleep(1000);
                }
                catch (Exception exex){
                    ;
                }
                try {

                    URLConnection con = url.openConnection();
                    //  con.connect();


                    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                    String current;
                    while ((current = in.readLine()) != null) {
                        float result_volume = Float.parseFloat(current);
                        int result = (int)result_volume;
                        if( result == 0 )
                            result = 3;
                        String temp = Integer.toString(result);

                        AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
                        audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, result, AudioManager.FLAG_PLAY_SOUND);
                        tv.setText("현재 볼륨: "+temp);
                    }
                } catch (Exception ex) {
                    tv.setText("Oh it is not receiving data :c ");
                }
                handler.postDelayed(this, 20);
            }
        }, 500);
        //tv.setText("빼애액 : ");
    }

    public void onSuspend(){
        timer.cancel();
    }
    protected  void onPause(){
        super.onPause();
        timer.cancel();
    }

    public void onStop(){
        super.onStop();
        timer.cancel();
    }

    public void onClick(View v) {
        AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);

     /*   int volume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC); //volume은 0~15 사이어야 함

        switch (v.getId()) {
            case R.id.UP:
                // 볼륨 올리기
                if (volume < 15) {
                    audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, volume + 1, AudioManager.FLAG_PLAY_SOUND);
                }

                break;

            case R.id.DOWN:
                // 볼륨 낮추기
                if (volume > 0) {
                    audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, volume - 1, AudioManager.FLAG_PLAY_SOUND);
                }
                break;

            case R.id.MUTE:
                audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, 0, AudioManager.FLAG_PLAY_SOUND);
                break;
        }

        volume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC); //volume은 0~15 사이어야 함
        tv.setText("현재 볼륨은 : " + volume);*/
    }

}
